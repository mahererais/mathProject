<?php

namespace App\Controller;

use App\Entity\Score;
use App\Repository\ScoreRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class ScoreController extends AbstractController
{
    #[Route('/scores', name: 'app_score_list')]
    public function list(ScoreRepository $scoreRepository): JsonResponse
    {

        $scores = $scoreRepository->findAll();

        return $this->json(
            $scores, 
            Response::HTTP_OK, 
            [], 
            ["groups" => "scores"]
        );
    }

    #[Route('/scores/{id}', name: 'app_score_find', requirements: ['id' => '\d+'])]
    public function find(ScoreRepository $scoreRepository, int $id): JsonResponse
    {
        // ! i.e : l'autowire ne fonctionne pas, je ne sais pas pourquoi
        $score = $scoreRepository->find($id);

        return $this->json(
            $score, 
            Response::HTTP_OK, 
            [], 
            ["groups" => "scores"]
        );
    }

    #[Route('/scores/delete/{id}', name: 'app_score_delete', requirements: ['id' => '\d+'], methods: ["GET", "POST"])]
    public function delete(ScoreRepository $scoreRepository, int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        
        $score = $scoreRepository->find($id);
        if ($score) {
            $entityManager->remove($score);
            $entityManager->flush();
            
            return $this->json(
                ["message" => "delete success"], 
                Response::HTTP_OK, 
            );
        }

    }


}
