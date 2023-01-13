<?php

namespace App\Model\Entity;

class Coloc extends BaseEntity
{
    private ?string $address = null;
    private ?int $postCode = null;
    private ?string $town = null;
    private ?string $picture = null;

    /**
     * @return string|null
     */
    public function getAddress(): ?string
    {
        return $this->address;
    }

    /**
     * @param string|null $address
     * @return Coloc
     */
    public function setAddress(?string $address): Coloc
    {
        $this->address = $address;
        return $this;
    }

    /**
     * @return int|null
     */
    public function getPostCode(): ?int
    {
        return $this->postCode;
    }

    /**
     * @param int|null $postCode
     * @return Coloc
     */
    public function setPostCode(?int $postCode): Coloc
    {
        $this->postCode = $postCode;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getTown(): ?string
    {
        return $this->town;
    }

    /**
     * @param string|null $town
     * @return Coloc
     */
    public function setTown(?string $town): Coloc
    {
        $this->town = $town;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getPicture(): ?string
    {
        return $this->picture;
    }

    /**
     * @param string|null $picture
     * @return Coloc
     */
    public function setPicture(?string $picture): Coloc
    {
        $this->picture = $picture;
        return $this;
    }
}
