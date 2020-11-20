const onExit = (err) => {
  if (err) {
    console.error(err, 'NODE ERROR>>>', 'ERRORS');
  } else {
    console.log('Node process - no errpr.', 'runner');
  }
};

module.exports = () => {
  const proc = process;
  proc.on('uncaughtException', onExit);
  proc.on('exit', onExit);
  proc.on('SIGINT', onExit);
};
