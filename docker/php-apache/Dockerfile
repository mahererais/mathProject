FROM php:8.1-apache

LABEL name="php8.1-apache"

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN apt-get update && apt-get install -y --no-install-recommends \ 
    locales \ 
    apt-utils \ 
    git \ 
    libicu-dev \ 
    g++ \ 
    libpng-dev \ 
    libxml2-dev \ 
    libzip-dev \ 
    libonig-dev \ 
    libxslt-dev \
    vim ;

RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
    echo "fr_FR.UTF-8 UTF-8" >> /etc/locale.gen && \
    locale-gen

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install pdo pdo_mysql gd opcache intl zip calendar dom mbstring zip xsl \
    && pecl install apcu \
    && docker-php-ext-enable apcu 

COPY . /var/www

COPY ./apache.conf /etc/apache2/sites-available/000-default.conf

RUN chown -R www-data:www-data /var/www

WORKDIR /var/www/