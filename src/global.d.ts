interface Account {
    _id?: any,
    id?: any,
    avatar?: string,
    username?: string,
    fullName: string,
    slug: string,
    email: string,
    address?: string,
    phone?: string,
    password?: string,
    role?: string,
    accessToken?: string,
    rePassword?: string,
    status?: string,
    telegramId: string,
}

interface Role {
    id?: any,
    name: string,
    slug: string,
    level: number,
    permissions: GlobalPermissions[],
    default: boolean,
    createdAt: Date,
    updatedAt: Date
}
