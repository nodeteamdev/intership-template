import { Request, Response, NextFunction } from 'express';

type ActionFunction = (req: Request, res: Response) => Promise<void>;

/**
 * Handler to catch `async` operation errors.
 * Reduces having to write `try-catch` all the time.
 * {@link https://stackoverflow.com/a/49664174/11666037}.
 */
const asyncErrorCatcher = (action: ActionFunction) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => action(req, res).catch(next);

export default asyncErrorCatcher;
