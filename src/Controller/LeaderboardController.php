<?php

namespace App\Controller;

use App\Repository\LeaderBoardRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class LeaderboardController extends AbstractController
{
    #[Route('/leaderboards', name: 'app_leaderboard')]
    public function index(LeaderBoardRepository $leaderBoardRepository): JsonResponse
    {
        $leaderboards = $leaderBoardRepository->findAll();
        //dd($leaderboards);

        return $this->json(
            $leaderboards, 
            Response::HTTP_OK,
        );
    }
}
