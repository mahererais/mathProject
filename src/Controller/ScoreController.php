<?php

namespace App\Controller;

use App\Entity\LeaderBoard;
use App\Entity\Score;
use App\Entity\User;
use App\Repository\ScoreRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

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

    #[Route('/scores/{id}', name: 'app_score_find', requirements: ['id' => '\d+'], methods: ["GET"])]
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

    #[Route('/scores/delete', name: 'app_score_deleteAll', methods: ["DELETE"])]
    public function deleteAll(EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->getRepository(Score::class)->deleteAllScores();
        $entityManager->flush();

        return $this->json(
            ["message" => "delete success"],
            Response::HTTP_OK,
        );
    }

    #[Route('/scores/delete/{id}', name: 'app_score_delete', requirements: ['id' => '\d+'], methods: ["DELETE"])]
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

    #[Route("/scores/add", name: "app_score_add", methods: ["POST"])]
    public function add(SerializerInterface $serializer, Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {
        $content = $request->getContent();
        try {
            $score = $serializer->deserialize($content, Score::class, 'json');
        } catch (NotEncodableValueException $e) {
            return $this->json(["error" => "JSON INVALID", 'data' => $content], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            return $this->json(["error" => "JSON INVALID", 'code' => $e->getCode(), 'message' => $e->getMessage(), ], Response::HTTP_BAD_REQUEST);
        }

        $errors = $validator->validate($score);

        if (count($errors) > 0) {

            // je crée un nouveau tableau d'erreur
            $dataErrors = [];

            foreach ($errors as $error) {
                $dataErrors[$error->getPropertyPath()][] = $error->getMessage();
            }

            return $this->json($dataErrors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // $score->setLeaderboard($entityManager->getRepository(LeaderBoard::class)->find(25));
        // $score->setUser($entityManager->getRepository(User::class)->find(38));

        $entityManager->persist($score);
        $entityManager->flush();

        return $this->json($score, Response::HTTP_CREATED, [], ["groups" => "scores"]);
    }
}
