<?php

namespace App\Model\Repository;

use App\Model\Entity\Expense;

class ExpenseRepository extends Repository
{
    /**
     * @param string $colocUuid
     * @param string $limitDate
     * @return array|null
     */
    public function getAllUnfixExpenseByColocUuid(string $colocUuid, string $limitDate): ?array
    {
        $expense =
            'SELECT u.pseudo, u.picture, e.name, e.value, e.type, e.category, e.date, e.fix, e.token
            FROM `expenses` e
            INNER JOIN users u ON e.user_uuid = u.uuid
            WHERE e.`coloc_uuid` = :colocUuid
            AND e.`fix` = 0
            AND date BETWEEN :limit AND NOW()
            AND e.`value` > 0
            AND type = "Achat"
            ORDER BY e.`date` DESC';

        $query = $this->pdo->prepare($expense);
        $query->bindValue(":colocUuid", $colocUuid);
        $query->bindValue(":limit", $limitDate);
        $query->execute();
        $expenses = [];
        while ($result = $query->fetch(\PDO::FETCH_ASSOC)) {
            $expenses[] = $result;
        }
        if (count($expenses) > 0) {
            return $expenses;
        }
        return null;
    }

    /**
     * @param string $colocUuid
     * @param string $limitDate
     * @return array|null
     */
    public function getAllfixExpenseByColocUuid(string $colocUuid, string $limitDate): ?array
    {
        $expense =
            'SELECT u.pseudo, u.picture, e.name, e.value, e.type, e.category, e.date, e.fix, e.token
            FROM `expenses` e
            INNER JOIN users u ON e.user_uuid = u.uuid
            WHERE e.`coloc_uuid` = :colocUuid
            AND e.`fix` = 1
            AND date BETWEEN :limit AND NOW()
            AND e.`value` > 0
            AND type = "Achat"
            ORDER BY e.`date` DESC';

        $query = $this->pdo->prepare($expense);
        $query->bindValue(":colocUuid", $colocUuid);
        $query->bindValue(":limit", $limitDate);
        $query->execute();
        $expenses = [];
        while ($result = $query->fetch(\PDO::FETCH_ASSOC)) {
            $expenses[] = $result;
        }
        if (count($expenses) > 0) {
            return $expenses;
        }
        return null;
    }

    /**
     * @param string $colocUuid
     * @param string $limitDate
     * @return array|null
     */
    public function getAllExpenseByColocUuidAndDateLimit(string $colocUuid, string $limitDate): ?array
    {
        $expense =
            'SELECT SUM(value) AS value, category
            FROM `expenses`
            WHERE `coloc_uuid` = :colocUuid
            AND date BETWEEN :limit AND NOW()
            AND `value` > 0
            GROUP BY `category`';

        $query = $this->pdo->prepare($expense);
        $query->bindValue(":colocUuid", $colocUuid);
        $query->bindValue(":limit", $limitDate);
        $query->execute();
        $expenses = [];
        while ($result = $query->fetch(\PDO::FETCH_ASSOC)) {
            $expenses[] = $result;
        }
        if (count($expenses) > 0) {
            return $expenses;
        }
        return null;
        /*return $query->fetch(\PDO::FETCH_ASSOC);*/
    }

    /**
     * @param string $colocUuid
     * @param string $userUuid
     * @param string $limitDate
     * @return array|null
     */
    public function getAllExpenseByColocAndUserAndDateLimit(string $colocUuid, string $userUuid, string $limitDate): ?array
    {
        $expense =
            'SELECT SUM(value) AS value, category
            FROM `expenses`
            WHERE `coloc_uuid` = :colocUuid
            AND `user_uuid` = :userUuid
            AND date BETWEEN :limit AND NOW()
            AND `value` > 0
            GROUP BY `category`';

        $query = $this->pdo->prepare($expense);
        $query->bindValue(":colocUuid", $colocUuid);
        $query->bindValue(":userUuid", $userUuid);
        $query->bindValue(":limit", $limitDate);
        $query->execute();

        $expenses = $query->fetchAll(\PDO::FETCH_ASSOC);
        if (count($expenses) > 0) {
            return $expenses;
        }
        return null;
    }

    /**
     * @param string $colocUuid
     * @param string $userUuid
     * @param string $limitDate
     * @return array|null
     */
    public function getAllExpenseByColocAndUser(string $colocUuid, string $userUuid): array
    {
        $expense =
            'SELECT SUM(value) AS value, u.pseudo
            FROM `expenses` e
            INNER JOIN users u on e.user_uuid = u.uuid
            WHERE e.`coloc_uuid` = :colocUuid
            AND e.`user_uuid` = :userUuid
            GROUP BY e.`user_uuid`';

        $query = $this->pdo->prepare($expense);
        $query->bindValue(":colocUuid", $colocUuid);
        $query->bindValue(":userUuid", $userUuid);
        $query->execute();

        $expenses = $query->fetchAll(\PDO::FETCH_ASSOC);
        if (count($expenses) > 0) {
            return $expenses;
        }
        return [];
    }


    /**
     * @param string $token
     * @return array|null
     */
    public function getExpenseByToken(string $token): ?array
    {
        $expense =
            'SELECT u.pseudo, u.picture, e.uuid, e.name, e.value, e.type, e.date, e.fix, e.token
            FROM `expenses` e
            INNER JOIN `users` u ON e.`user_uuid` = u.`uuid`
            WHERE `token` = :token';

        $query = $this->pdo->prepare($expense);
        $query->bindValue(":token", $token);
        $query->execute();
        $expenses = [];
        while ($result = $query->fetch(\PDO::FETCH_ASSOC)) {
            $expenses[] = $result;
        }
        if (count($expenses) > 0) {
            return $expenses;
        }
        return null;
    }

    public function insertExpense(Expense $expense): bool
    {
        $newExpense =
            'INSERT INTO `expenses` (uuid, name, value, type, user_uuid, coloc_uuid, fix, token)
            VALUES (:uuid, :name, :value, :type, :user_uuid, :coloc_uuid, :fix, :token)';

        $query = $this->pdo->prepare($newExpense);
        $query->bindValue(':uuid', $expense->getUuid());
        $query->bindValue(':name', $expense->getName());
        $query->bindValue(':value', $expense->getValue());
        $query->bindValue(':type', $expense->getType());
        $query->bindValue(':user_uuid', $expense->getUserUuid());
        $query->bindValue(':coloc_uuid', $expense->getColocUuid());
        $query->bindValue(':fix', $expense->getFix());
        $query->bindValue(':token', $expense->getToken());

        return $query->execute();
    }

    public function updateExpense(array $expenses): bool
    {
        $updateExpense =
            'UPDATE `expenses`
            SET `name` = :name, `value` = :value, `type` = :type, `fix` = :fix
            WHERE `uuid` = :uuid';

        foreach ($expenses as $expense) {
            $query = $this->pdo->prepare($updateExpense);
            $query->bindValue(':name', $expense->getName());
            $query->bindValue(':value', $expense->getValue());
            $query->bindValue(':type', $expense->getType());
            $query->bindValue(':fix', $expense->getFix());
            $query->bindValue(':uuid', $expense->getUuid());
            $query->execute();
        }
        return true;
    }

    public function deleteExpense(string $token): bool
    {
        $deleteExpense = 'DELETE FROM `expenses` WHERE `token` = :token';
        $query = $this->pdo->prepare($deleteExpense);
        $query->bindValue(':token', $token);

        return $query->execute();
    }
}
