<?php

namespace App\Serializer;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class ScoreDenormalizer implements DenormalizerInterface
{

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    
    // c'est la fonction qui determine si on utilise bien ce dénormalizer
    public function supportsDenormalization($data, string $type, string $format = null)
    {
        //dump($type, $data);
        //  Dans quel cas je vais bien utiliser mon denormalizer custom
        // si c'est un entier et que c'est une entité symfo je vais chercher en bdd l'élément qui correspond
        if(isset($data["id"]) && is_int($data["id"]) && strpos($type,"App\Entity") === 0){
            return true;
        }

        return false;
    }

    // la logique de dénormalization
    public function denormalize($data, string $type, string $format = null, array $context = [])
    {
        // quand supportDenormalization return true, le code ci-dessous est lancé
        // j'utilise l'entityManager pour find l'élément en question (type) en bdd avec son id (data)
        $data = $this->entityManager->find($type,$data) ;
        return $data;
    }
}