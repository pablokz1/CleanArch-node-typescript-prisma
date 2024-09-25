import { ApiExpress } from "./infra/api/express/api.express";
import { CreateProductRoute } from "./infra/api/express/routes/product/creat-product.express.route";
import { ListProductRoute } from "./infra/api/express/routes/product/list-product.express.route";
import { ProductRepositoryPrisma } from "./infra/repositories/product/product.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateProductUsecase } from "./usecases/create-product/creat-product.usecase";
import { ListProductUsecase } from "./usecases/list-product/list-product.usecase";

function main() {
    const aRepository = ProductRepositoryPrisma.create(prisma);

    const createProductUsecae = CreateProductUsecase.create(aRepository);
    const listProductUsecase = ListProductUsecase.create(aRepository);

    const createRoute = CreateProductRoute.create(createProductUsecae);
    const listRoute = ListProductRoute.create(listProductUsecase);

    const api = ApiExpress.create([createRoute, listRoute]);
    const port = 8000;
    api.start(port);
}

main();