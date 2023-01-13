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
        $response = (array) json_decode(file_get_contents('php://input'));

        $mail = $response['email'];
        $password = $response['pwd'];

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
        $response = (array) json_decode(file_get_contents('php://input'));

        $mail = $response['email'];

        $userRepository = new UserRepository(new PDOFactory());
        $user = $userRepository->getUserByMail($mail);
        if (!isset($user)) {
            $user = new User($response);
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

    #[Route('/api/updateUserProfile', 'update', ['POST'])]
    public function update()
    {
        $response = (array) json_decode(file_get_contents('php://input'));

        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

        $userRepository = new UserRepository(new PDOFactory());
        $user = $userRepository->getUserByUuid($currentUser);

        if ($response['email'] != null) {
            $email = $response['email'];
            $existMail = $userRepository->getUserByMail($email);
            if ($existMail) {
                $this->renderJSON([
                    'error' => 'cet email est déjà pris'
                ]);
                die();
            }
            $user->setEmail($email);
        }

        if ($response['oldPassword'] != null && $response['newPassword'] != null) {
            $oldPassword = $response['oldPassword'];
            $newPassword = $response['newPassword'];
            if (!$user->verifyPassword($oldPassword)) {
                $this->renderJSON([
                    'error' => 'Mot de passe incorrect'
                ]);
                die();
            }
            $user->setPwd($newPassword, true);
        }

        if ($response['pseudo'] != null) {
            $user->setPseudo($response['pseudo']);
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
