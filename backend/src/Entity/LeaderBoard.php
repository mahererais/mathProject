<?php

namespace App\Entity;

use App\Repository\LeaderBoardRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: LeaderBoardRepository::class)]
#[ORM\HasLifecycleCallbacks]
class LeaderBoard
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["leaderboards"])]
    private ?int $id = null;

    #[ORM\Column(length: 32, unique: true)]
    #[Groups(["scores", "leaderboards"])]
    private ?string $title = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\OneToMany(mappedBy: 'leaderboard', targetEntity: Score::class, orphanRemoval: true)]
    private Collection $scores;

    #[ORM\Column(length: 2)]
    #[Groups(["scores", "leaderboards"])]
    private ?string $operateur = null;

    public function __construct(?int $id = null)
    {
        if ($id) {
            $this->id = $id;
        }
        $this->scores = new ArrayCollection();
    }

    public function __toString() 
    {
        return "LeaderBoard __toString function";
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

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

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }
    
    #[ORM\PreUpdate]
    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return Collection<int, Score>
     */
    public function getScores(): Collection
    {
        return $this->scores;
    }

    public function addScore(Score $score): self
    {
        if (!$this->scores->contains($score)) {
            $this->scores->add($score);
            $score->setLeaderboard($this);
        }

        return $this;
    }

    public function removeScore(Score $score): self
    {
        if ($this->scores->removeElement($score)) {
            // set the owning side to null (unless already changed)
            if ($score->getLeaderboard() === $this) {
                $score->setLeaderboard(null);
            }
        }

        return $this;
    }

    public function getOperateur(): ?string
    {
        return $this->operateur;
    }

    public function setOperateur(string $operateur): self
    {
        $this->operateur = $operateur;

        return $this;
    }
}
