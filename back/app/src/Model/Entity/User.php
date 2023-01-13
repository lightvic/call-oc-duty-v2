<?php

namespace App\Model\Entity;
class User extends BaseEntity
{
    private ?string $pseudo = null;
    private ?string $email = null;
    private ?string $pwd = null;
    private ?string $picture = null;

    /**
     * @return string|null
     */
    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    /**
     * @param string|null $pseudo
     * @return User
     */
    public function setPseudo(?string $pseudo): User
    {
        $this->pseudo = $pseudo;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getEmail(): ?string
    {
        return $this->email;
    }

    /**
     * @param string|null $email
     * @return User
     */
    public function setEmail(?string $email): User
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getPwd(): ?string
    {
        return $this->pwd;
    }

    /**
     * @param string|null $pwd
     * @return User
     */
    public function setPwd(?string $pwd, bool $hash = false): User
    {
        if ($hash) {
            $pwd = password_hash($pwd, PASSWORD_DEFAULT);
        }
        $this->pwd = $pwd;
        return $this;
    }

    /**
     * @param $plainPassword
     * @return bool
     */
    public function verifyPassword($plainPassword): bool
    {
        return password_verify($plainPassword, $this->pwd);
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
     * @return User
     */
    public function setPicture(?string $picture): User
    {
        $this->picture = $picture;
        return $this;
    }
}
