export function checkUser(req: any, res: any, next: any) {
  const role: string = req.user.role;
  if (role !== 'admin' && role !== 'user') {
    return res.status(401).json({
      message: 'not user',
    });
  } else {
    next();
  }
}