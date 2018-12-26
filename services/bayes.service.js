
/**
 * Combines two probabilities using Bayes' theorem. This is the
 * approach known as "naive Bayes", very well explained here:
 * http://www.paulgraham.com/naivebayes.html
 */

const computeNaiveBayes = function(prob1, prob2) {
  return (prob1 * prob2) / ((prob1 * prob2) + ((1.0 - prob1) * (1.0 - prob2)));
};
module.exports.computeNaiveBayes = computeNaiveBayes;
