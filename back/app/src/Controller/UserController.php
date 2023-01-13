<?php

namespace App\Controller;

use App\Model\Factory\PDOFactory;
use App\Model\Repository\UserRepository;
use App\Model\Entity\User;
use App\Route\Route;
use App\Services\JWTHelper;

class UserController extends Controller
{
    #[Route('/api/login', name: 'login', methods: ['POST'])]
    public function login()
    {
        $mail = $_POST['email'];
        $password = $_POST['pwd'];

        $userRepository = new UserRepository(new PDOFactory());
        $user = $userRepository->getUserByMail($mail);

        if ($user && $user->verifyPassword($password)) {
            $jwt = JWTHelper::buildJWT($user);
            $this->renderJSON([
                "token" => $jwt
            ]);
            http_response_code(200);
            die();
        }
        $this->renderJSON([
            "error" => 'utilisateur invalide'
        ]);
        die();
    }

    #[ROUTE('/api/signUp', 'signup', ['POST'])]
    public function signUp()
    {
        $mail = $_POST['email'];

        $userRepository = new UserRepository(new PDOFactory());
        $user = $userRepository->getUserByMail($mail);
        if (!isset($user)) {
            $user = new User($_POST);
            $uuid = $this->makeUuid();
            $user->setUuid($uuid);
            $user = $userRepository->insert($user);
            $jwt = JWTHelper::buildJWT($user);
            $this->renderJSON([
                "token" => $jwt
            ]);
            http_response_code(200);
            die();
        }
        $this->renderJSON([
            'error' => 'Mot de passe ou utilisateur invalide'
        ]);
        die();
    }

    /* useless until it's not */
    /*#[Route('/api/signOut', 'signout', ['POST'])]
    public function signout()
    {
        if($_SERVER["REQUEST_METHOD"] === "POST") {
            unset($_SESSION["user"]);
            http_response_code(200);
        }
        exit();
    }*/

    #[Route('/api/updateUserProfile', 'update', ['POST'])]
    public function update()
    {
        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

        $userRepository = new UserRepository(new PDOFactory());
        $user = $userRepository->getUserByUuid($currentUser);

        if ($_POST['email'] != null) {
            $email = $_POST['email'];
            $existMail = $userRepository->getUserByMail($email);
            if ($existMail) {
                $this->renderJSON([
                    'error' => 'cet email est déjà pris'
                ]);
                die();
            }
            $user->setEmail($email);
        }

        if ($_POST['oldPassword'] != null && $_POST['newPassword'] != null) {
            $oldPassword = $_POST['oldPassword'];
            $newPassword = $_POST['newPassword'];
            if (!$user->verifyPassword($oldPassword)) {
                $this->renderJSON([
                    'error' => 'Mot de passe incorrect'
                ]);
                die();
            }
            $user->setPwd($newPassword, true);
        }

        if ($_POST['pseudo'] != null) {
            $user->setPseudo($_POST['pseudo']);
        }

        $file = null;
        if ($_FILES['fileToUpload']['name']) {
            $fileName = $this->MakeUuid() . '.' . strtolower(pathinfo($_FILES["fileToUpload"]['name'],PATHINFO_EXTENSION));
            $isSaved = $this->saveFile($fileName);
            if ($isSaved[0] === 'error'){
                $this->renderJSON($isSaved);
                die();
            }
            $file = $fileName;
        }
        $user->setPicture($file);

        $userRepository->update($user);

        $this->renderJSON([
            'success' => 'mise à jour du user effectuée avec succès'
        ]);
        die();
    }

    #[Route('/api/deleteUser', 'delete user', ['POST'])]
    public function deleteUser()
    {
        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

        $userRepository = new UserRepository(new PDOFactory());
        if ($currentUser) {
            $userRepository->delete($currentUser);

            $this->renderJSON([
                'success' => 'supression du user effectuée avec succès'
            ]);
            die();
        }

        $this->renderJSON([
            "error" => 'uuid invalide'
        ]);
        die();
    }
}
