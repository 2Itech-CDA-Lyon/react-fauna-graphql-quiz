import faunaClient from './fauna-client.mjs';
import faunadb from 'faunadb';
const fql = faunadb.query;

const users = [
  { id: 1, email: 'jeanpierre@test.com' },
  { id: 2, email: 'mariegenevieve@test.com' },
];

const quizzes = [
  { id: 1, title: 'Divers faits étonnants', description: 'Etonnez-vous avec ces petites choses de la vie quotidienne que vous ignorez probablement!', difficulty: 1, authorId: 1 },
  { id: 2, title: 'The Big Bang Theory', description: 'Êtes-vous un vrai fan de The Big Bang Theory? Pour le savoir, un seul moyen: répondez à ce quiz ulti…', difficulty: 3, authorId: 2 },
];

const questions = [
  { id: 1, quizId: 1, rightAnswerId: 3, text: 'Combien de joueurs y a-t-il dans une équipe de football?', order: 1 },
  { id: 2, quizId: 1, rightAnswerId: 6, text: 'Combien de temps la lumière du soleil met-elle pour nous parvenir?', order: 2 },
  { id: 3, quizId: 1 , rightAnswerId: 11, text: 'En 1582, le pape Grégoire XIII a décidé de réformer le calendrier instauré par Jules César. Mais que…', order: 3 },
  { id: 4, quizId: 1 , rightAnswerId: 13, text: 'Lequel de ces signes du zodi\'est pas un signe d\'Eau?', order: 4 },
  { id: 5, quizId: 1 , rightAnswerId: 20, text: 'Combien de doigts ai-je dans mon dos?', order: 5 },
  { id: 6, quizId: 2 , rightAnswerId: 23, text: 'Quel langage fictif Howard parle-t-il?', order: 1 },
  { id: 7, quizId: 2 , rightAnswerId: 26, text: 'Quel est le seul acteur de la série qui possède un doctorat dans la vraie vie?', order: 2 },
  { id: 8, quizId: 2 , rightAnswerId: 31, text: 'Dans quel appartement Penny et Leonard vivent-ils?', order: 3 },
  { id: 9, quizId: 2 , rightAnswerId: 35, text: 'Combien de fois Sheldon doit-il frapper à une porte et dire le nom d\'une personne avant d\'entrer?', order: 4 },
  { id: 10, quizId: 2, rightAnswerId: 37, text: 'Quel groupe de rock alternatif canadien a créé le générique musical de The Big Bang Theory?', order: 5 },
];

const answers = [
  { id: 1 , questionId: 1, text: '5' },
  { id: 2 , questionId: 1, text: '7' },
  { id: 3 , questionId: 1, text: '11' },
  { id: 4 , questionId: 1, text: '235' },
  { id: 5 , questionId: 2, text: '15 secondes' },
  { id: 6 , questionId: 2, text: '8 minutes' },
  { id: 7 , questionId: 2, text: '2 heures' },
  { id: 8 , questionId: 2, text: '3 mois' },
  { id: 9 , questionId: 3, text: 'Janvier' },
  { id: 10, questionId: 3, text: 'Février' },
  { id: 11, questionId: 3, text: 'Mars' },
  { id: 12, questionId: 3, text: 'Avril' },
  { id: 13, questionId: 4, text: 'Le Verseau' },
  { id: 14, questionId: 4, text: 'Le Cancer' },
  { id: 15, questionId: 4, text: 'Le Scorpion' },
  { id: 16, questionId: 4, text: 'Les Poissons' },
  { id: 17, questionId: 5, text: '2' },
  { id: 18, questionId: 5, text: '3' },
  { id: 19, questionId: 5, text: '4' },
  { id: 20, questionId: 5, text: '5, comme tout le monde' },
  { id: 21, questionId: 6, text: 'L\'eflque' },
  { id: 22, questionId: 6, text: 'Le Valyrien' },
  { id: 23, questionId: 6, text: 'Le Klingon' },
  { id: 24, questionId: 6, text: 'Le Serpentard' },
  { id: 25, questionId: 7, text: 'Kaley Cuoco' },
  { id: 26, questionId: 7, text: 'Mayim Bialik' },
  { id: 27, questionId: 7, text: 'Johnny Galecki' },
  { id: 28, questionId: 7, text: 'Jim Parsons' },
  { id: 29, questionId: 8, text: '3A' },
  { id: 30, questionId: 8, text: '3B' },
  { id: 31, questionId: 8, text: '4A' },
  { id: 32, questionId: 8, text: '4B' },
  { id: 33, questionId: 9, text: 'Une' },
  { id: 34, questionId: 9, text: 'Deux' },
  { id: 35, questionId: 9, text: 'Trois' },
  { id: 36, questionId: 9, text: 'Quatre' },
  { id: 37, questionId: 10, text: 'Barenaked Ladies' },
  { id: 38, questionId: 10, text: 'Static in Stereo' },
  { id: 39, questionId: 10, text: 'Brundlefly' },
];

const run = async () => {
  console.info('Truncating collections...');
  for (const collectionName of ['Users', 'Quizzes', 'Questions', 'Answers']) {
    await faunaClient.query(
      fql.Map(
        fql.Paginate(
          fql.Match(
            fql.Index(`all${collectionName}`)
          )
        ),
        fql.Lambda('ref', fql.Delete(fql.Var('ref')))
      )
    )
  }

  // Create users
  console.info('Creating users...');
  for (const user of users) {
    const { id, email } = user;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('User'),
          id,
        ),
        {
          data: {
            email
          }
        }
      )
    )
  }

  // Create quizzes
  console.info('Creating quizzes...');
  for (const quiz of quizzes) {
    const { id, title, description, difficulty, authorId } = quiz;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('Quiz'),
          id,
        ),
        {
          data: {
            title,
            description,
            difficulty,
            author: fql.Ref(
              fql.Collection('User'),
              authorId,
            )
          }
        }
      )
    )
  }

  // Create questions
  console.info('Creating questions...');
  for (const question of questions) {
    const { id, text, order, quizId, rightAnswerId } = question;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('Question'),
          id,
        ),
        {
          data: {
            text,
            order,
            quiz: fql.Ref(
              fql.Collection('Quiz'),
              quizId,
            ),
            rightAnswer: fql.Ref(
              fql.Collection('Answer'),
              rightAnswerId,
            ),
          }
        }
      )
    )
  }

  // Create answers
  console.info('Creating answers...');
  for (const answer of answers) {
    const { id, text, questionId } = answer;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('Answer'),
          id,
        ),
        {
          data: {
            text,
            question: fql.Ref(
              fql.Collection('Question'),
              questionId,
            )
          }
        }
      )
    )
  }
}

// Run main process
run().catch((err) => {
  console.error(err);
  process.exit(1);
});
