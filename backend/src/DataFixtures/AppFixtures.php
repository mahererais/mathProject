<?php

namespace App\DataFixtures;

use App\Entity\LeaderBoard;
use App\Entity\Score;
use App\Entity\User;
use DateTime;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Persistence\ObjectManager;
use PhpParser\Node\Expr\Cast\Array_;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{

    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher) {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // ===============================
        // = generation des utilisateurs
        $pseudos = ["rayan", "lilia", "ilyes", "elissa", "maher"];
        /** @var user[] */
        $users = [];

        foreach ($pseudos as $pseudo) {
            $user = new User;
            $user->setUsername($pseudo);
            $user->setPassword($this->passwordHasher->hashPassword($user, $pseudo));
            $user->setRoles(["ROLE_USER"]);
            $users[] = $user;

            $manager->persist($user);
        }
        // ===============================
        // = generation des leaderBoards
        $leaderBoardsTitles = [
            "plus" => "+", 
            "moins"  => "-", 
            "multiplication"  => "x", 
            "division"  => "/"];
        $leaderBoards = [];   
        
        foreach ($leaderBoardsTitles as $title => $operator) {
            $leaderBoard = new LeaderBoard();
            $leaderBoard->setTitle($title);
            $leaderBoard->setOperateur($operator);
            $manager->persist($leaderBoard);

            $leaderBoards[] = $leaderBoard;
        }

        // ===============================
        // = generation des scores
        // for ($i=0; $i < 20; $i++) { 
        //     $nombreEquationMax = 10;
        //     $score = new Score();
        //     $score->setScore(mt_rand(0, $nombreEquationMax) + 1);
        //     $score->setTimer(mt_rand($nombreEquationMax, 200) . ":" . str_pad(mt_rand(0, 99), 2));
            
        //     // = mes relations 
        //     $score->setUser($users[array_rand($users)]);
        //     $score->setLeaderboard($leaderBoards[array_rand($leaderBoards)]);
            
        //     // =  generation de mes equations en fonction du mode de jeu (+ , -, x ou /)
        //     $operator = $score->getLeaderboard()->getOperateur();
        //     $score->setEquations($this->getEquations($operator, $nombreEquationMax));
            
        //     $manager->persist($score);
        // }
        // ===============================
        $manager->flush();
    }

    /**
     * @return string[] : liste d'equations
     */
    private function getEquations(string $operator, $size = 10) : Array {
        
        $equations = [];
        
        for ($i=0; $i < $size; $i++) { 
            $a = mt_rand(0, 10);
            $b = mt_rand(0, 10);
            $equations[] = "$a $operator $b";
        }

        return $equations;
    }
}
