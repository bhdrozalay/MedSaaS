module.exports = {

"[project]/src/lib/prisma.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "prisma": ()=>prisma
});
var __TURBOPACK__commonjs__external__$40$prisma$2f$client__ = __turbopack_external_require__("@prisma/client", true);
"__TURBOPACK__ecmascript__hoisting__location__";
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__commonjs__external__$40$prisma$2f$client__["PrismaClient"]({
    log: [
        'query'
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;

})()),
"[project]/src/lib/auth.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "authenticateUser": ()=>authenticateUser,
    "createTenant": ()=>createTenant,
    "hashPassword": ()=>hashPassword,
    "verifyPassword": ()=>verifyPassword
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
async function verifyPassword(password, hashedPassword) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(password, hashedPassword);
}
async function hashPassword(password) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, 12);
}
async function authenticateUser(email, password) {
    try {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                email
            },
            include: {
                tenant: true,
                department: true,
                role: true
            }
        });
        if (!user || !user.isActive) {
            return null;
        }
        // Check if tenant is active
        if (user.tenant.status === 'CANCELLED') {
            throw new Error('Hesap iptal edilmiş');
        }
        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            // Increment failed login attempts
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.update({
                where: {
                    id: user.id
                },
                data: {
                    failedLoginAttempts: user.failedLoginAttempts + 1,
                    accountLockedUntil: user.failedLoginAttempts >= 4 ? new Date(Date.now() + 15 * 60 * 1000) // Lock for 15 minutes
                     : null
                }
            });
            return null;
        }
        // Check if account is locked
        if (user.accountLockedUntil && user.accountLockedUntil > new Date()) {
            throw new Error('Hesap geçici olarak kilitlendi');
        }
        // Reset failed attempts on successful login
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.update({
            where: {
                id: user.id
            },
            data: {
                failedLoginAttempts: 0,
                accountLockedUntil: null,
                lastLogin: new Date()
            }
        });
        // Log audit entry
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].auditLog.create({
            data: {
                tenantId: user.tenantId,
                userId: user.id,
                action: 'USER_LOGIN',
                details: {
                    email: user.email,
                    timestamp: new Date().toISOString()
                }
            }
        });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            tenantId: user.tenantId,
            tenantName: user.tenant.name,
            departmentId: user.departmentId,
            roleId: user.roleId,
            isActive: user.isActive
        };
    } catch (error) {
        console.error('Authentication error:', error);
        throw error;
    }
}
async function createTenant(data) {
    try {
        // Check if tenant with same tax number exists
        const existingTenant = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].tenant.findUnique({
            where: {
                taxNumber: data.taxNumber
            }
        });
        if (existingTenant) {
            throw new Error('Bu vergi numarası ile kayıtlı bir şirket bulunmaktadır');
        }
        // Check if admin email exists
        const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                email: data.adminEmail
            }
        });
        if (existingUser) {
            throw new Error('Bu e-posta adresi ile kayıtlı bir kullanıcı bulunmaktadır');
        }
        const hashedPassword = await hashPassword(data.password);
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
            // Create tenant
            const tenant = await tx.tenant.create({
                data: {
                    name: data.companyName,
                    type: data.companyType,
                    taxNumber: data.taxNumber,
                    taxOffice: data.taxOffice,
                    address: data.address,
                    city: data.city,
                    district: data.district,
                    phone: data.phone,
                    website: data.website,
                    industryType: data.industryType,
                    employeeCount: data.employeeCount,
                    businessDescription: data.businessDescription,
                    status: 'DEMO',
                    demoEndDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days
                }
            });
            // Create default departments
            const managementDept = await tx.department.create({
                data: {
                    tenantId: tenant.id,
                    name: 'Yönetici',
                    description: 'Genel yönetim ve tüm modül erişimi',
                    isCustom: false
                }
            });
            // Create admin role
            const adminRole = await tx.role.create({
                data: {
                    tenantId: tenant.id,
                    departmentId: managementDept.id,
                    name: 'Admin',
                    permissions: {
                        modules: [
                            '*'
                        ],
                        actions: [
                            '*'
                        ]
                    },
                    isCustom: false
                }
            });
            // Create admin user
            const adminUser = await tx.user.create({
                data: {
                    name: data.adminName,
                    email: data.adminEmail,
                    phone: data.adminPhone,
                    password: hashedPassword,
                    tenantId: tenant.id,
                    departmentId: managementDept.id,
                    roleId: adminRole.id,
                    isActive: true,
                    emailVerified: false
                }
            });
            // Get professional plan
            const proPlan = await tx.subscriptionPlan.findFirst({
                where: {
                    name: 'Profesyonel Plan'
                }
            });
            if (proPlan) {
                // Create demo subscription
                await tx.tenantSubscription.create({
                    data: {
                        tenantId: tenant.id,
                        planId: proPlan.id,
                        status: 'DEMO',
                        userCount: 1,
                        demoEndDate: tenant.demoEndDate,
                        currentPeriodStart: new Date(),
                        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    }
                });
            }
            return {
                tenant,
                adminUser
            };
        });
        return result;
    } catch (error) {
        console.error('Tenant creation error:', error);
        throw error;
    }
}

})()),
"[project]/src/app/api/auth/login/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_import__("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/auth.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const loginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email('Geçerli e-posta adresi giriniz'),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Şifre boş olamaz'),
    rememberMe: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
async function POST(request) {
    try {
        const body = await request.json();
        // Validate request data
        const validatedData = loginSchema.parse(body);
        // Authenticate user
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authenticateUser"])(validatedData.email, validatedData.password);
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: 'E-posta veya şifre hatalı'
            }, {
                status: 401
            });
        }
        // TODO: Generate JWT token/session
        // TODO: Set secure cookies
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Giriş başarılı',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                tenantId: user.tenantId,
                tenantName: user.tenantName,
                role: 'admin' // TODO: Get from role data
            },
            redirectTo: '/dashboard'
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Login error:', error);
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: 'Form verilerinde hata var',
                errors: error.errors
            }, {
                status: 400
            });
        }
        // Handle specific auth errors
        if (error instanceof Error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: error.message
            }, {
                status: 401
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: 'Giriş işlemi başarısız oldu'
        }, {
            status: 500
        });
    }
}

})()),

};

//# sourceMappingURL=src_0defbe._.js.map