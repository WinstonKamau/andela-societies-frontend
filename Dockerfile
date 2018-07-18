FROM node:carbon

LABEL AUTHOR="Thomas Nyambati <thomas.nyambati@andela.com>"
LABEL application="soc-frontend"

#due to the rapid changes the serve team is making please 
#use this version of serve

RUN yarn global add servir@1.0.3

WORKDIR /application

COPY public /application

CMD serve -p 4000 -s true -l true
