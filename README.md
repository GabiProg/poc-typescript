# Catálogo de plantas

Um projeto pensado para ajudar donos de pequenas hortas e jardins a terem conhecimento sobre suas plantas.

**Como rodar e instalar local**

npm install && npx nodemon src/app.ts

**Rotas**

post /plants - adiciona a planta enviando pelo body com nome, nome científico e foto

get /plants - lista todas as plantas

get /plants/:id - lista uma planta específica pelo id na rota

put /plants/:id - atuliza as informções da planta pelo id na rota e enviando pelo body nome, nome científico e foto

delete /plants/:id delata a plnata pelo id na rota
