import type { z } from "zod";
import type { photoFileSchema } from "@/src/features/user/shared/schemas/photo.schema";

export type PhotoFileDto = z.infer<typeof photoFileSchema>;
