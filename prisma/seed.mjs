import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL is required to run the seed");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const permissionData = [
	{ name: "users:read", description: "View users" },
	{ name: "users:create", description: "Create users" },
	{ name: "users:update", description: "Update users" },
	{ name: "users:delete", description: "Delete users" },
];

const roleData = [
	{
		name: "admin",
		description: "Full access",
		permissions: permissionData.map((permission) => permission.name),
	},
	{
		name: "cashier",
		description: "Can view and create users",
		permissions: ["users:read", "users:create"],
	},
	{
		name: "viewer",
		description: "Read-only access",
		permissions: ["users:read"],
	},
];

const userData = [
	{ name: "Ana", lastName: "Garcia", role: "admin" },
	{ name: "Bruno", lastName: "Lopez", role: "cashier" },
	{ name: "Carla", lastName: "Martinez", role: "viewer" },
	{ name: "Diego", lastName: "Perez", role: "cashier" },
	{ name: "Elena", lastName: "Ramirez", role: "viewer" },
	{ name: "Fabian", lastName: "Torres", role: "cashier" },
	{ name: "Gabriela", lastName: "Santos", role: "viewer" },
	{ name: "Hugo", lastName: "Morales", role: "cashier" },
	{ name: "Irene", lastName: "Castro", role: "viewer" },
	{ name: "Jorge", lastName: "Vega", role: "cashier" },
	{ name: "Karen", lastName: "Navarro", role: "viewer" },
	{ name: "Luis", lastName: "Rojas", role: "viewer" },
];

try {
	await prisma.$transaction(async (tx) => {
		const permissions = new Map();

		for (const permission of permissionData) {
			const savedPermission = await tx.permission.upsert({
			where: { name: permission.name },
			update: { description: permission.description },
			create: permission,
			});

			permissions.set(savedPermission.name, savedPermission);
		}

		const roles = new Map();

		for (const role of roleData) {
			const savedRole = await tx.role.upsert({
				where: { name: role.name },
				update: {
					description: role.description,
					permissions: {
						set: role.permissions.map((name) => ({
							id: permissions.get(name).id,
						})),
					},
				},
				create: {
					name: role.name,
					description: role.description,
					permissions: {
						connect: role.permissions.map((name) => ({
							id: permissions.get(name).id,
						})),
					},
				},
			});

			roles.set(savedRole.name, savedRole);
		}

		const SALT_ROUNDS = 10;

for (const [index, user] of userData.entries()) {
			const email = `seed.user${index + 1}@example.com`;
			const role = roles.get(user.role);
			const passwordHash = await bcrypt.hash("password123", SALT_ROUNDS);

			await tx.user.upsert({
				where: { email },
			update: {
				name: user.name,
				lastName: user.lastName,
				password: passwordHash,
				active: true,
				deletedAt: null,
					role: { connect: { id: role.id } },
					profile: {
						upsert: {
							create: {
								bio: `Seed profile for ${user.name}`,
								avatarUrl: `https://example.com/avatars/${index + 1}.png`,
							},
							update: {
								bio: `Seed profile for ${user.name}`,
								avatarUrl: `https://example.com/avatars/${index + 1}.png`,
							},
						},
					},
				},
				create: {
					name: user.name,
					lastName: user.lastName,
					email,
					password: passwordHash,
					role: { connect: { id: role.id } },
					profile: {
						create: {
							bio: `Seed profile for ${user.name}`,
							avatarUrl: `https://example.com/avatars/${index + 1}.png`,
						},
					},
				},
			});
		}
	});

	console.log("Seed completed: 3 roles, 4 permissions, 12 users and profiles.");
} finally {
	await prisma.$disconnect();
}
