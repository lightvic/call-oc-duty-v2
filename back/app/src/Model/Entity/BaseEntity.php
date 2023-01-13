<?php

    namespace App\Model\Entity;

    use App\Model\Traits\Hydrator;

    abstract class BaseEntity implements \JsonSerializable
    {

        /**
         * @var string|null
         */
        protected ?string $uuid = null;

        use Hydrator;

        /**
         * @param array $data
         */
        public function __construct(array $data = [])
        {
            $this->hydrate($data);
        }

        /**
         * @return string|null
         */
        public function getUuid(): ?string
        {
            return $this->uuid;
        }

        /**
         * @param string $uuid
         * @return string
         */
        public function setUuid(string $uuid): string
        {
            return $this->uuid = $uuid;
        }

        /**
         * @return mixed
         */
        public function jsonSerialize(): mixed
        {
            $reflection = new \ReflectionClass($this);
            $atts = [];

            foreach ($reflection->getProperties() as $property) {
                $atts[$property->getName()] = $property->getValue($this);
            }

            return $atts;
        }
    }
