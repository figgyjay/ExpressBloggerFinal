import express from 'express';
import { body, validationResult } from 'express-validator';

function UserBlogValidation() {
  return [
    body('title')
      .isLength({ min: 4 })
      .withMessage('title must be at least 4 chars long')
      .isLength({ max: 30 })
      .withMessage(' title must be less than 30 chars long')
      .exists()
      .withMessage('title is required')
      .trim()
      .matches()
      .withMessage()
      .escape(),
    body('text')
	.isEmpty('text is required'),
	body('author')
	.isEmpty('author name is required'),
    body('email')
	.isEmail().normalizeEmail().withMessage('Invailid Email').exists(),
	body('categories')
	.isEmpty('category is required')
    .isLength({ min: 4 }),
	body('starRating')
	.matches(number > 10)
	.withMessage(" Only ratings 1 - 10 are allowed")
	.matches(number < 1 )
	.withMessage(" Only ratings 1 - 10 are allowed"),  
  ];
}

const app = express();
const port = 3000;

app.use(express.json());
app.post('/register', UserBlogValidation(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.sendStatus(200);
});

app.listen(port, () => console.log('HTTP server started at port 3000'));
