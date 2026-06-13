import { createClient } from "@/lib/supabase/client";

const STORAGE_BUCKET = "inspection-media";

export function getStorageUrl(path: string) {
  const supabase = createClient();
  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function uploadFile(file: File, path: string) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) throw error;
  return getStorageUrl(data.path);
}

export async function deleteFile(path: string) {
  const supabase = createClient();
  const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([path]);
  if (error) throw error;
}

export async function uploadInspectionImage(file: File, inspectionId: string) {
  const ext = file.name.split(".").pop();
  const path = `inspections/${inspectionId}/${Date.now()}.${ext}`;
  return uploadFile(file, path);
}

export async function uploadAvatar(file: File, userId: string) {
  const ext = file.name.split(".").pop();
  const path = `avatars/${userId}.${ext}`;
  return uploadFile(file, path);
}
