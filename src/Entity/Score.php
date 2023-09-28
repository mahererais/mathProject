<?php

namespace App\Entity;

use App\Repository\ScoreRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ScoreRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Score
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["scores"])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(["scores"])]
    private ?int $score = null;

    #[ORM\Column(length: 32)]
    #[Groups(["scores"])]
    private ?string $timer = null;

    #[ORM\Column]
    #[Groups(["scores"])]
    private array $equations = [];

    #[ORM\Column]
    #[Groups(["scores"])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'scores')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["scores"])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'scores')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["scores"])]
    private ?LeaderBoard $leaderboard = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getScore(): ?int
    {
        return $this->score;
    }

    public function setScore(int $score): static
    {
        $this->score = $score;

        return $this;
    }

    public function getTimer(): ?string
    {
        return $this->timer;
    }

    public function setTimer(string $timer): static
    {
        $this->timer = $timer;

        return $this;
    }

    public function getEquations(): array
    {
        return $this->equations;
    }

    public function setEquations(array $equations): static
    {
        $this->equations = $equations;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    #[ORM\PrePersist]
    public function setCreatedAt(): static
    {
        $this->createdAt = new \DateTimeImmutable;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getLeaderboard(): ?LeaderBoard
    {
        return $this->leaderboard;
    }

    public function setLeaderboard(?LeaderBoard $leaderboard): static
    {
        $this->leaderboard = $leaderboard;

        return $this;
    }
}
