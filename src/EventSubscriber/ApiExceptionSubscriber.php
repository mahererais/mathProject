<?php

namespace App\EventSubscriber;

use App\Entity\Score;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class ApiExceptionSubscriber implements EventSubscriberInterface
{
    public function onKernelException(ExceptionEvent $event): void
    {
        // je récupère le requête
        $request = $event->getRequest();
        if (strpos($request->getPathInfo(), "/api") !== 0) {
            return;
        }

        // récupérer l'exception
        $exception = $event->getThrowable();
        
        //dd($exception);
        // le cas des erreurs serveur 500+
        if (method_exists($exception, "getStatusCode") === false) {
            // ! c'est volontaire rendre une exception symfony et non un erreur en json
            // ! n'oublies pas de prevoire une page 404 et 500
            // ! si tu veux une erreur json, il suffit de retirer la condition et remplacer plus bas 
            // * $exception->getStatusCode() par : method_exists($exception, "getStatusCode") ? $exception->getStatusCode() : 500 
            $response = new JsonResponse(["error" => $exception->getMessage()],500);
            //return;
        }else{
            // renvoyer une réponse avec en JSON le contenu du message ET le bon code http
            $response = new JsonResponse(
                ["error" => $exception->getMessage()],
                $exception->getStatusCode(),
            );
        }


        //  ici je set la nouvelle réponse qui est personnalisé
        $event->setResponse($response);
    }


    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => 'onKernelException',
        ];
    }
}
