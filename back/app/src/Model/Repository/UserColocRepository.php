<?php

namespace App\Model\Repository;

use App\Model\Entity\UserColoc;

class UserColocRepository extends Repository
{
    public function getUserColocByColocUuid(string $colocUuid): ?UserColoc
    {
        $query = $this->pdo->prepare(
            "SELECT *
            FROM `users_colocs`
            WHERE `coloc_uuid` = :colocUuid"
        );
        $query->bindValue(':colocUuid', $colocUuid);
        $query->execute();
        $userColoc = $query->fetch(\PDO::FETCH_ASSOC);
        if ($userColoc) {
            return new UserColoc($userColoc);
        }
        return null;
    }

    public function getAdminByColocUuid($colocUuid): ?array
    {
        $query = $this->pdo->prepare(
            "SELECT user_uuid
            FROM `users_colocs`
            WHERE `admin` = 1
            AND `coloc_uuid` = :colocUuid"
        );
        $query->bindValue(':colocUuid', $colocUuid);
        $query->execute();
        $admin = $query->fetch(\PDO::FETCH_ASSOC);
        if ($admin) {
            return $admin;
        }
        return null;
    }

    public function insertUserColoc(UserColoc $userColoc): UserColoc
    {
        $newUserColoc =
            'INSERT INTO `users_colocs` (uuid, user_uuid, coloc_uuid, admin)
            VALUES (:uuid, :user_uuid, :coloc_uuid, :admin)';

        $query = $this->pdo->prepare($newUserColoc);
        $query->bindValue(':uuid', $userColoc->getUuid());
        $query->bindValue(':user_uuid', $userColoc->getUserUuid());
        $query->bindValue(':coloc_uuid', $userColoc->getColocUuid());
        $query->bindValue(':admin', $userColoc->getAdmin());
        $query->execute();

        return $this->getUserColocByUuid($userColoc->getUuid());
    }

    private function getUserColocByUuid(string $uuid): ?UserColoc
    {
        $query = $this->pdo->prepare(
            "SELECT *
            FROM `users_colocs`
            WHERE `uuid` = :uuid"
        );
        $query->bindValue(':uuid', $uuid);
        $query->execute();
        $userColoc = $query->fetch(\PDO::FETCH_ASSOC);
        if ($userColoc) {
            return new UserColoc($userColoc);
        }
        return null;
    }

    public function deleteUserColocByUserUuidAndColocUuid($userUuid, $colocUuid): bool
    {
        $deleteUserColoc =
            "DELETE FROM `users_colocs`
            WHERE `user_uuid` = :userUuid
            AND `coloc_uuid` = :colocUuid"
        ;
        $query = $this->pdo->prepare($deleteUserColoc);
        $query->bindValue(':userUuid', $userUuid);
        $query->bindValue(':colocUuid', $colocUuid);

        return $query->execute();
    }

    public function getUserColocByUserUuidAndColocUuid($userUuid, $colocUuid): ?UserColoc
    {
        $userColoc =
            'SELECT * FROM `users_colocs`
            WHERE coloc_uuid = :colocUuid
            AND user_uuid = :userUuid';

        $query = $this->pdo->prepare($userColoc);
        $query->bindValue(':userUuid', $userUuid);
        $query->bindValue(':colocUuid', $colocUuid);
        $query->execute();

        $userColoc = $query->fetch(\PDO::FETCH_ASSOC);
        if ($userColoc) {
            return new UserColoc($userColoc);
        }
        return null;
    }
}
