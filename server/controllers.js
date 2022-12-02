
const { readQuestions, readAnswers, addQuestion, addAnswer } = require('./models.js');

const getQuestions = (req, res) => {
  //console.log('HERE!!', req)
  var page = req.query.page || 1;
  var count = req.query.count || 5;
  var product_id = req.params.question_id || 1;

  readQuestions(product_id, page, count)
    .then((results) => {
      //console.log('results from controllers readQuestions', results)
      res.send(results)
    })
    .catch(err => {
      res.status(500).send({
        message: "Controllers readQuestions Error.", err
      });
    });
}

const getAnswers = (req, res) => {
  //console.log('GET ANSWERS HERE!!', req)
  var page = req.query.page || 1;
  var count = req.query.count || 5;
  var question_id = req.params.question_id || 1;

  readAnswers(question_id, page, count)
    .then((results) => {
      //console.log('results from controllers readAnswers', results)
      res.send(results)
    })
    .catch(err => {
      res.status(500).send({
        message: "Controllers readAnswers ERR", err
      });
    });
}

const postQuestion = (req, res) => {
  //console.log('POST A QUESTION HERE!!', req.query)
  var product_id = req.query.product_id || 1;
  var body = req.query.body
  var asker_name = req.query.asker_name
  var asker_email = req.query.asker_email
  var reported = 0;
  var helpful = 0;
  var date_written = Date.now()

  addQuestion(product_id, body, asker_name, asker_email, reported, helpful, date_written)
    .then((results) => {
      // console.log('date writtennnn', date_written)
      // console.log('results from controllers addQuestion', results)
      res.send(results)
    })
    .catch(err => {
      res.status(500).send({
        message: "Controllers addQuestion ERR", err
      });
    });
}

const postAnswer = (req, res) => {
  console.log('POST AN ANSWER HERE!!', req.query)
  var question_id = req.params.question_id || 1;
  var body = req.query.body
  var answerer_name = req.query.answerer_name
  var answerer_email = req.query.answerer_email
  var reported = 0;
  var helpful = 0;
  var date_written = Date.now()

  addAnswer(question_id, body, answerer_name, answerer_email, reported, helpful, date_written)
    .then((results) => {
      console.log('date writtennnn', date_written)
      console.log('results from controllers postAnswer', results)
      res.send(results)
    })
    .catch(err => {
      res.status(500).send({
        message: "Controllers postAnswer ERR", err
      });
    });
}

module.exports = {
  getQuestions,
  getAnswers,
  postQuestion,
  postAnswer
}