require('dotenv').config();
const fs = require('fs');
const express = require('express');
const port = process.env.PORT | 3000;
const morgan = require('morgan');

// Express App
const app = express();

// Middleware
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8')
);

// Routes Handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getSingleTour = (req, res) => {
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

const createNewTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

// Routes
app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getSingleTour);
app.post('/api/v1/tours', createNewTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

// Port Listening
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
