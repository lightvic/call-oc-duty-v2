<?php

namespace App\Model\Entity;

use DateTime;

class Expense extends BaseEntity
{
    private ?string $name = null;
    private null|int|float $value = null;
    private ?string $type = null;
    private ?string $category = null;
    private ?DateTime $date = null;
    private ?string $fix = null;
    private ?string $token = null;
    private ?string $userUuid = null;
    private ?string $colocUuid = null;

    /**
     * @return string|null
     */
    public function getCategory(): ?string
    {
        return $this->category;
    }

    /**
     * @param string|null $category
     */
    public function setCategory(?string $category): void
    {
        $this->category = $category;
    }



    /**
     * @return string|null
     */
    public function getFix(): ?string
    {
        return $this->fix;
    }

    /**
     * @param string|null $fix
     * @return Expense
     */
    public function setFix(?string $fix): Expense
    {
        $this->fix = $fix;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getToken(): ?string
    {
        return $this->token;
    }

    /**
     * @param string|null $token
     * @return Expense
     */
    public function setToken(?string $token): Expense
    {
        $this->token = $token;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string|null $name
     * @return Expense
     */
    public function setName(?string $name): Expense
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return float|int|null
     */
    public function getValue(): float|int|null
    {
        return $this->value;
    }

    /**
     * @param float|int|null $value
     * @return Expense
     */
    public function setValue(null|int|float $value): Expense
    {
        $this->value = $value;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getType(): ?string
    {
        return $this->type;
    }

    /**
     * @param string|null $type
     * @return Expense
     */
    public function setType(?string $type): Expense
    {
        $this->type = $type;
        return $this;
    }

    /**
     * @return string
     */
    public function getDate(): string
    {
        return $this->date->format('Y-m-d H:i:s');
    }

    /**
     * @param DateTime|null $date
     * @return Expense
     * @throws \Exception
     */
    public function setDate(?DateTime $date): Expense
    {
        $this->date = new Datetime($date);
        return $this;
    }

    /**
     * @return string|null
     */
    public function getUserUuid(): ?string
    {
        return $this->userUuid;
    }

    /**
     * @param string|null $userUuid
     * @return Expense
     */
    public function setUserUuid(?string $userUuid): Expense
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
     * @return Expense
     */
    public function setColocUuid(?string $colocUuid): Expense
    {
        $this->colocUuid = $colocUuid;
        return $this;
    }

}
