<?php

namespace App\Model\Entity;

class UserColoc extends BaseEntity
{
    private ?string $userUuid = null;
    private ?string $colocUuid = null;
    private ?string $admin = null;

    /**
     * @return string|null
     */
    public function getUserUuid(): ?string
    {
        return $this->userUuid;
    }

    /**
     * @param string|null $userUuid
     * @return UserColoc
     */
    public function setUserUuid(?string $userUuid): UserColoc
    {
        $this->userUuid = $userUuid;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getColocUuid(): ?string
    {
        return $this->colocUuid;
    }

    /**
     * @param string|null $colocUuid
     * @return UserColoc
     */
    public function setColocUuid(?string $colocUuid): UserColoc
    {
        $this->colocUuid = $colocUuid;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getAdmin(): ?string
    {
        return $this->admin;
    }

    /**
     * @param string|null $admin
     * @return UserColoc
     */
    public function setAdmin(?string $admin): UserColoc
    {
        $this->admin = $admin;
        return $this;
    }

}
