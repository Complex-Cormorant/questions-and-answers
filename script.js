import http from 'k6/http';
import { sleep, check, group } from 'k6';

export let options = {
  stages: [
    { duration: '50s', target: 100 }, // below normal load
    { duration: '100s', target: 300 }, // normal load
    { duration: '100s', target: 500 }, // around breaking point
    { duration: '100s', target: 1000 }, // beyond breaking point
    { duration: '100s', target: 200 }, // scale down
  ],
  // thresholds: {
  //   http_req_failed: ['rate<0.01'], // errors are less than 1%,
  //   http_req_duration: ['p(95)<5000'], // 95% of requests should be under 5000
  // },
};
const sleep_duration = 1;

export default function () {

  group('initial app load', () => {

    // app.get('/qa/questions/:product_id', db.getQuestions);
    // app.get('/qa/questions/:question_id/answers', db.getAnswers);

    const product_max = 1000011;
    const product_min = 1;
    const question_max = 3518968;
    const question_min = 1;

    const product_id = Math.round((Math.random() * (product_max - product_min)) + product_min);
    const question_id = Math.round((Math.random() * (question_max - question_min)) + question_min);

    let getQuestions = http.get(`http://localhost:3000/qa/questions?${product_id}`);
    check(getQuestions, {
      'is status 200': (response) => response.status === 200,
      'is duration < 2000ms': (response) => response.timings.duration < 2000,
    })
    sleep(sleep_duration);

    let getAnswers = http.get(`http://localhost:3000/qa/questions/${question_id}/answers`);
    check(getAnswers, {
      'is status 200': (response) => response.status === 200,
      'is duration < 2000ms': (response) => response.timings.duration < 2000,
    })
    sleep(sleep_duration);
  })

}