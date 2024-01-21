import { rest } from 'msw';

interface AuthRequestBody {
  email: string;
  password: string;
}

export let users = [
  {
    id: '1',
    email: 'test@test.com',
    password: 'testtest',
  },
];

export const mockToken = 'mocktoken-test';

const loginHandler = rest.post<AuthRequestBody>(
  `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
  (req, res, ctx) => {
    const { email, password } = req.body;

    if (email === '' || password === '') {
      return res(ctx.status(500));
    }

    const match = users.filter((user) => {
      return user.email === email && user.password === password;
    });

    if (false) {
      return res(ctx.status(401));
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          token: mockToken,
        })
      );
    }
  }
);

const registerHandler = rest.post<AuthRequestBody>(
  `${process.env.NEXT_PUBLIC_API_URL}/users`,
  (req, res, ctx) => {
    const { email, password } = req.body;

    if (email === '' || password === '') {
      return res(ctx.status(500));
    }

    const match = users.filter((user) => {
      return user.email === email;
    });

    if (match.length !== 0) {
      return res(ctx.status(409));
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          email: email,
        })
      );
    }
  }
);

export const handlers = [loginHandler, registerHandler];