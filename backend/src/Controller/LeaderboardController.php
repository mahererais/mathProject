<?php

namespace App\Controller;

use App\Repository\LeaderBoardRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class LeaderboardController extends AbstractController
{
    #[Route('/leaderboards', name: 'app_leaderboard_lits')]
    public function list(LeaderBoardRepository $leaderBoardRepository): JsonResponse
    {
        $leaderboards = $leaderBoardRepository->findAll();
        //dd($leaderboards);

        return $this->json(
            $leaderboards, 
            Response::HTTP_OK,
            [], 
            ["groups" => "leaderboards"]
        );
    }

    #[Route('/leaderboards/{title}', name: 'app_leaderboard_find')]
    public function find(LeaderBoardRepository $leaderboardRepository, string $title): JsonResponse
    {
        $leaderboard = $leaderboardRepository->findBy(["title" => $title]);

        return $this->json(
            $leaderboard, 
            Response::HTTP_OK, 
            [], 
            ["groups" => "leaderboards"]
        );
    }

    #[Route('/leaderboards/delete/{id}', name: 'app_leaderboard_delete', requirements: ['id' => '\d+'], methods: ["GET", "POST"])]
    public function delete(LeaderboardRepository $leaderboardRepository, int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $leaderboard = $leaderboardRepository->find($id);
        if ($leaderboard) {
            $entityManager->remove($leaderboard);
            $entityManager->flush();
            
            return $this->json(
                ["message" => "delete success"], 
                Response::HTTP_OK, 
            );
        }

    }
}
