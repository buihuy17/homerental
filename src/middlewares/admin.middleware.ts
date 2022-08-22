export function checkAdmin(req: any, res: any, next: any) {
  const role: string = req.user.role;
  if (role !== 'admin') {
    return res.status(401).json({
      message: 'not admin'
    });
  } else {
    next();
  }
}