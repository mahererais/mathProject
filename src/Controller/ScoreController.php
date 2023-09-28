<?php

namespace App\Controller;

use App\Repository\ScoreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class ScoreController extends AbstractController
{
    #[Route('/scores', name: 'app_score')]
    public function index(ScoreRepository $scoreRepository): JsonResponse
    {

        $scores = $scoreRepository->findAll();

        return $this->json(
            $scores, 
            Response::HTTP_OK, 
            [], 
            ["groups" => "scores"]
        );
    }
}
