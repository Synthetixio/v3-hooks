function testname() {
  return Cypress.currentTest.titlePath.join('--').replace(/[^\w-]+/gi, '-');
}

module.exports = {
  testname,
};
