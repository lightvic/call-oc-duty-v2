<?php

namespace App\Model\Repository;

use App\Model\Entity\User;

class UserRepository extends Repository
{
    /**
     * @return User[]
     */
    public function getAllUsers(): array
    {
        $query = $this->pdo->query("SELECT * FROM users");

        $users = [];

        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $users[] = new User($data);
        }

        return $users;
    }

    /**
     * @param $uuid
     * @return User|null
     */
    public function getUserByUuid($uuid): ?User
    {
        $query = $this->pdo->prepare(
            "SELECT *
            FROM `users`
            WHERE `uuid` = :uuid"
        );
        $query->bindValue(':uuid', $uuid);
        $query->execute();
        $user = $query->fetch(\PDO::FETCH_ASSOC);
        if ($user) {
            return new User($user);
        }
        return null;
    }

    public function getAllUsersByCollocUuid($colocUuid): ?array
    {
        $query = $this->pdo->prepare(
            "SELECT u.picture, u.pseudo, u.uuid, u.email, uc.admin
            FROM `users_colocs` uc
            INNER JOIN colocs c ON c.uuid = uc.coloc_uuid
            INNER JOIN users u on uc.user_uuid = u.uuid
            AND uc.coloc_uuid = :colocUuid"
        );
        $query->bindValue(':colocUuid', $colocUuid);
        $query->execute();
        $users = [];
        while ($result = $query->fetch(\PDO::FETCH_ASSOC)) {
            $users[] = $result;
        }
        if (count($users) > 0) {
            return $users;
        }
        return null;
    }

    /**
     * @param $email
     * @return User|null
     */
    public function getUserByMail($email): ?User
    {
        $query =
            'SELECT *
        FROM `users`
        WHERE `email` = :email';

        $db = $this->pdo->prepare($query);
        $db->bindValue(':email', $email);
        $db->execute();

        $user = $db->fetch(\PDO::FETCH_ASSOC);
        if ($user) {
            return new User($user);
        }
        return null;
    }

    /**
     * @param User $user
     * @return User
     */
    public function insert(User $user): User
    {
        $user->setPwd($user->getPwd(), true);
        $newUser =
            "INSERT INTO `users` (`email`, `pwd`, `uuid`, `pseudo`)
            VALUES(:email, :pwd, :uuid, :pseudo)";

        $query = $this->pdo->prepare($newUser);
        $query->bindValue(':email', $user->getEmail());
        $query->bindValue(':pwd', $user->getPwd());
        $query->bindValue(':uuid', $user->getUuid());
        $query->bindValue(':pseudo', $user->getPseudo());
        $query->execute();

        return $this->getUserByUuid($user->getUuid());
    }

    /**
     * @param User $user
     * @param $hashPassword
     * @return bool
     */
    public function update(User $user, $hashPassword = false): bool
    {
        $user->setPwd($user->getPwd(), $hashPassword);
        $updateUser =
            'UPDATE `users`
            SET `email` = :email, `pwd` = :pwd, `picture` = :picture, `pseudo` = :pseudo
            WHERE `uuid` = :uuid';

        $query = $this->pdo->prepare($updateUser);
        $query->bindValue(':email', $user->getEmail());
        $query->bindValue(':pwd', $user->getPwd());
        $query->bindValue(':picture', $user->getPicture());
        $query->bindValue(':pseudo', $user->getPseudo());
        $query->bindValue(':uuid', $user->getUuid());

        return $query->execute();
    }

    /**
     * @param $uuid
     * @return bool
     */
    public function delete($uuid)
    {
        $deleteUser = "DELETE FROM `users` WHERE `uuid` = :uuid";
        $query = $this->pdo->prepare($deleteUser);
        $query->bindValue(':uuid', $uuid);

        return $query->execute();
    }
}
