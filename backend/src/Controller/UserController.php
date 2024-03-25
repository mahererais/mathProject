<?php

namespace App\Controller;

use App\Repository\ScoreRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class UserController extends AbstractController
{
    #[Route('/users', name: 'app_user_list')]
    public function list(UserRepository $userRepository): JsonResponse
    {
        $users = $userRepository->findAll();

        return $this->json(
            $users, 
            Response::HTTP_OK, 
            [],
            ["groups" => "users"]
        );
    }

    #[Route('/users/{username}', name: 'app_user_find')]
    public function find(UserRepository $userRepository, string $username): JsonResponse
    {
        $user = $userRepository->findOneBy(["username" => $username]);

        return $this->json(
            $user, 
            Response::HTTP_OK, 
        );
    }

    #[Route('/users/delete/{username}', name: 'app_user_delete', methods: ["GET", "POST"])]
    public function delete(UserRepository $userRepository, string $username, EntityManagerInterface $entityManager): JsonResponse
    {
        
        $user = $userRepository->findOneBy(["username" => $username]);
        if ($user) {
            $entityManager->remove($user);
            $entityManager->flush();
            
            return $this->json(
                ["message" => "delete success"], 
                Response::HTTP_OK, 
            );
        }
    }

    #[Route('/user/{id}/scores', name: 'app_user_scores', requirements: ['id' => '\d+'], methods: ["GET"])]
    public function getScore(ScoreRepository $scoreRepository, int $id): JsonResponse
    {
        $score = $scoreRepository->findScoreForUser($id);

        return $this->json(
            $score,
            Response::HTTP_OK,
            [],
            ["groups" => "scores"]
        );
    }
}
