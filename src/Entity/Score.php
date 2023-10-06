<?php

namespace App\Entity;

use App\Repository\ScoreRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

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
    #[Assert\NotBlank(message: "le score ne peut pas être vide")]
    #[Assert\Type(type: "int", message: "le score doit être un entier")]
    private ?int $score = null;

    #[ORM\Column(length: 32)]
    #[Groups(["scores"])]
    #[Assert\NotBlank(message: "le timer ne pas être vide")]
    #[Assert\Length(
        max : 11,
        min : 4,
        minMessage : "erreur lors de l'ajout du timer (non respect des contraintes)",
        maxMessage : "erreur lors de l'ajout du timer (non respect des contraintes)"
        )]
    private ?string $timer = null;

    #[ORM\Column]
    #[Groups(["scores"])]
    #[Assert\NotBlank(message: "il n'a pas de d'equation")]
    #[Assert\Count(
        min : 10,
        minMessage : "vous devez avoir au moins 10 equations",
        )]
    #[Assert\Type(
        type: 'array',
        message: 'cette valeur {{ value }} is not a valid {{ type }}.'
        )]
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

    public function setScore(int $score): self
    {
        $this->score = $score;

        return $this;
    }

    public function getTimer(): ?string
    {
        return $this->timer;
    }

    public function setTimer(string $timer): self
    {
        $this->timer = $timer;

        return $this;
    }

    public function getEquations(): array
    {
        return $this->equations;
    }

    public function setEquations(array $equations): self
    {
        $this->equations = $equations;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    #[ORM\PrePersist]
    public function setCreatedAt(): self
    {
        $this->createdAt = new \DateTimeImmutable;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getLeaderboard(): ?LeaderBoard
    {
        return $this->leaderboard;
    }

    public function setLeaderboard(?LeaderBoard $leaderboard): self
    {
        $this->leaderboard = $leaderboard;

        return $this;
    }
}
