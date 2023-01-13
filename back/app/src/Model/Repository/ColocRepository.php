<?php

namespace App\Model\Repository;


use App\Model\Entity\Coloc;

class ColocRepository extends Repository
{
    /**
     * @param $uuid
     * @return Coloc|null
     */
    public function getColocByUuid($uuid): ?Coloc
    {
        $query = $this->pdo->prepare(
            "SELECT *
            FROM `colocs`
            WHERE `uuid` = :uuid"
        );
        $query->bindValue(':uuid', $uuid);
        $query->execute();
        $coloc = $query->fetch(\PDO::FETCH_ASSOC);
        if ($coloc) {
            return new Coloc($coloc);
        }
        return null;
    }

    /**
     * @param $uuid
     * @return Coloc|null
     */
    public function getAllColocByUserId($userUuid): ?array
    {
        $query = $this->pdo->prepare(
            "SELECT c.uuid, c.name, c.address, c.picture, c.post_code, c.town, uc.admin
            FROM `users_colocs` uc
            INNER JOIN colocs c ON c.uuid = uc.coloc_uuid
            AND uc.user_uuid = :userUuid"
        );
        $query->bindValue(':userUuid', $userUuid);
        $query->execute();
        $colocs = [];
        while ($result = $query->fetch(\PDO::FETCH_ASSOC)) {
            $colocs[] = $result;
        }
        if (count($colocs) > 0) {
            return $colocs;
        }
        return null;
    }

    /**
     * @param Coloc $coloc
     * @return Coloc
     */
    public function insert(Coloc $coloc): Coloc
    {
        $newColoc =
            'INSERT INTO `colocs` (`uuid`, `name`, `address`, `post_code`, `town`)
            VALUES(:uuid, :name, :address, :postCode, :town)';

        $query = $this->pdo->prepare($newColoc);
        $query->bindValue(':uuid', $coloc->getUuid());
        $query->bindValue(':name', $coloc->getName());
        $query->bindValue(':address', $coloc->getAddress());
        $query->bindValue(':postCode', $coloc->getPostCode());
        $query->bindValue(':town', $coloc->getTown());
        $query->execute();

        return $this->getColocByUuid($coloc->getUuid());
    }

    /**
     * @param Coloc $coloc
     * @return bool
     */
    public function update(Coloc $coloc): bool
    {
        $updateColoc =
            'UPDATE `colocs`
            SET `address` = :address, `name` = :name, `post_code` = :postCode, `town` = :town, `picture` = :picture
            WHERE `uuid` = :uuid';

        $query = $this->pdo->prepare($updateColoc);
        $query->bindValue(':address', $coloc->getAddress());
        $query->bindValue(':name', $coloc->getName());
        $query->bindValue(':postCode', $coloc->getPostCode());
        $query->bindValue(':town', $coloc->getTown());
        $query->bindValue(':picture', $coloc->getPicture());
        $query->bindValue(':uuid', $coloc->getUuid());

        return $query->execute();
    }

    /**
     * @param $uuid
     * @return bool
     */
    public function delete($uuid): bool
    {
        $deleteColoc = 'DELETE FROM `colocs` WHERE `uuid` = :uuid';
        $query = $this->pdo->prepare($deleteColoc);
        $query->bindValue(':uuid', $uuid);

        return $query->execute();
    }
}
