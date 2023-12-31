import { object, string, TypeOf } from 'zod';

export const createFileSchema = object({
  body: object({
    // name: string({
    //   required_error: 'Name is required',
    // }),
    folderId: string(),
    userId: string({
      required_error: 'file owner {userId} is required',
    }),
  }),
});

export const compressFileSchema = object({
  body: object({
    files: string().array().nonempty(),
    archiveName: string(),
    destinationFolder: string(),
  }),
});

const params = {
  params: object({
    fileId: string(),
  }),
};


export const getFileByIdSchema = object({
    ...params
  });

  export const getFileByUserIdSchema = object({
    params: object({
      userId: string(),
    }),
  });
export const updateFileSchema = object({
  ...params,
  body: object({
    name: string(),
    folderId: string(),
    userId: string(),
  }).partial(),
});

export const moveFileSchema = object({
  ...params,
  body: object({
    destinationFolderId: string(),
  }).partial(),
});
export const copyFileSchema = object({
  ...params,
  body: object({
    destinationFolderId: string(),
  }).partial(),
});
export const renameFileSchema = object({
  ...params,
  body: object({
    name: string(),
  }).partial(),
});

export const deleteFileSchema = object({
  ...params,
});

export type CreateFileInput = TypeOf<typeof createFileSchema>['body'];
export type CompressFileInput = TypeOf<typeof compressFileSchema>['body'];
export type GetFileInput = TypeOf<typeof getFileByIdSchema>['params'];
export type GetUserFilesInput = TypeOf<typeof getFileByUserIdSchema>['params'];
export type UpdateFileInput = TypeOf<typeof updateFileSchema>;
export type RenameFileInput = TypeOf<typeof renameFileSchema>;
export type MoveFileInput = TypeOf<typeof moveFileSchema>;
export type CopyFileInput = TypeOf<typeof copyFileSchema>;
export type DeleteFileInput = TypeOf<typeof deleteFileSchema>['params'];
