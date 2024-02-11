// Custom middleware that logs out the type and path of each request to the server
const clog = (req, res, next) => {
  const fgYellow = '\x1b[3;33m';
  switch (req.method) {
    case 'GET': {
      console.info(`📗 ${fgYellow}${req.method} request to ${req.path}`);
      break;
    }
    case 'POST': {
      console.info(`📘 ${fgYellow}${req.method} request to ${req.path}`);
      break;
    }
    default:
      console.log(`📙 ${fgYellow}${req.method} request to ${req.path}`);
  }

  next();
};

exports.clog = clog;
