const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8')
);

// Routes Handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getSingleTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.filter((element) => element.id === Number(id));

  if (tour.length == 1) {
    res.status(200).json({
      status: 'success',
      result: tour.length,
      data: {
        tour: tour,
      },
    });
  } else {
    res.status(404).json({
      status: 'fail',
      result: tour.length,
      data: {
        tour: tour,
      },
    });
  }
};

exports.createNewTour = (req, res) => {
  const newTour = { ...req.body, id: tours[tours.length - 1].id + 1 };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.filter((element) => element.id === Number(id));
  if (tour.length == 1) {
    let newTour;
    tours.map((item, index) => {
      if (item.id === Number(id)) {
        tours[index] = { ...tours[index], ...req.body };
        newTour = tours[index];
      }
    });

    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
      }
    );

    res.status(200).json({
      status: 'success',
      result: tour.length,
      data: {
        tour: newTour,
      },
    });
  } else {
    res.status(404).json({
      status: 'fail',
      result: tour.length,
      data: {
        tour: tour,
      },
    });
  }
};

exports.deleteTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.filter((element) => element.id === Number(id));
  if (tour.length === 1) {
    let newTour;
    tours.map((item, index) => {
      if (item.id === Number(id)) {
        newTour = tours.splice(index, 1);
      }
    });

    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
      }
    );

    res.status(200).json({
      status: 'success',
      result: tour.length,
      data: {
        tour: newTour,
      },
    });
  } else {
    res.status(404).json({
      status: 'fail',
      result: tour.length,
      data: {
        tour: tour,
      },
    });
  }
};
