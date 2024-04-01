<?php

namespace App\Listener;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTDecodedEvent;
use Symfony\Component\HttpFoundation\RequestStack;

class JWTListener {

    public function __construct(private readonly RequestStack $requestStack)
    {}
    
    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $request = $this->requestStack->getCurrentRequest();

        
        $payload       = $event->getData();
        $payload['ip'] = $request->getClientIp();

        /** @var User */
        $user = $event->getUser();   
        $payload['id'] = $user->getId();

        $event->setData($payload);
    
        $header        = $event->getHeader();
        $header['cty'] = 'JWT';
    
        $event->setHeader($header);
    }

    /**
     * @param JWTDecodedEvent $event
     *
     * @return void
     */
    public function onJWTDecoded(JWTDecodedEvent $event)
    {
        $request = $this->requestStack->getCurrentRequest();

        $payload = $event->getPayload();
        //dump($payload);

        if (!isset($payload['ip']) || $payload['ip'] !== $request->getClientIp()) {
            $event->markAsInvalid();
        }
    }
}
