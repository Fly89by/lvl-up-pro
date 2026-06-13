SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict BFFS9a2QdDZcoi5RxWVKixntRT5DVL8eRnm7xhHM4AgOCgL6yobBV4MAgWhmnqp

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	(NULL, 'b0000000-0000-0000-0000-000000000001', NULL, 'authenticated', 'admin@tamayuz.sa', '$2a$06$q.6saHAMboedOAzEPgaUnOagfsU/9l8LCm0nLpEiUSHrOPI7IzWBC', '2026-06-13 07:03:33.448534+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	(NULL, 'b0000000-0000-0000-0000-000000000002', NULL, 'authenticated', 'manager@tamayuz.sa', '$2a$06$J9QeVEnaydQo7o5D.y5h6e6I.N7hPdZhfGFq8HWfPGskMskYWf.au', '2026-06-13 07:03:33.448534+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	(NULL, 'b0000000-0000-0000-0000-000000000003', NULL, 'authenticated', 'inspector@tamayuz.sa', '$2a$06$wqrIR2np44T75XUtJCfwvuI.2gaV9MiiRPetGPVKH/F/xOmX5MELS', '2026-06-13 07:03:33.448534+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('admin@tamayuz.sa', 'b0000000-0000-0000-0000-000000000001', '{"sub": "b0000000-0000-0000-0000-000000000001", "email": "admin@tamayuz.sa"}', 'email', '2026-06-13 07:04:06.002908+00', '2026-06-13 07:04:06.002908+00', '2026-06-13 07:04:06.002908+00', 'b0000000-0000-0000-0000-000000000001'),
	('manager@tamayuz.sa', 'b0000000-0000-0000-0000-000000000002', '{"sub": "b0000000-0000-0000-0000-000000000002", "email": "manager@tamayuz.sa"}', 'email', '2026-06-13 07:04:06.002908+00', '2026-06-13 07:04:06.002908+00', '2026-06-13 07:04:06.002908+00', 'b0000000-0000-0000-0000-000000000002'),
	('inspector@tamayuz.sa', 'b0000000-0000-0000-0000-000000000003', '{"sub": "b0000000-0000-0000-0000-000000000003", "email": "inspector@tamayuz.sa"}', 'email', '2026-06-13 07:04:06.002908+00', '2026-06-13 07:04:06.002908+00', '2026-06-13 07:04:06.002908+00', 'b0000000-0000-0000-0000-000000000003');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."organizations" ("id", "name", "slug", "logo_url", "industry", "plan_type", "billing_status", "trial_ends_at", "settings", "is_active", "created_at", "updated_at") VALUES
	('a0000000-0000-0000-0000-000000000001', 'شركة التميز للجودة', 'tamayuz', NULL, 'restaurant', 'growth', 'active', NULL, '{}', true, '2026-06-13 07:01:58.513031+00', '2026-06-13 07:01:58.513031+00'),
	('a0000000-0000-0000-0000-000000000002', 'مؤسسة الإتقان للتجارة', 'itqan', NULL, 'retail', 'free', 'trialing', NULL, '{}', true, '2026-06-13 07:01:58.513031+00', '2026-06-13 07:01:58.513031+00');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("id", "org_id", "email", "full_name", "phone", "role", "avatar_url", "password_hash", "is_active", "language", "last_login", "created_at", "updated_at") VALUES
	('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'admin@tamayuz.sa', 'أحمد العلي', NULL, 'org_admin', NULL, '$2a$06$mkspik.PThhfyT5eFDuBie8eNkvGQ/Ne1EtAqiKGYza5sTRApTE2C', true, 'ar', NULL, '2026-06-13 07:01:58.513031+00', '2026-06-13 07:01:58.513031+00'),
	('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'manager@tamayuz.sa', 'سارة خالد', NULL, 'manager', NULL, '$2a$06$Vm6kIWnUqeiZ.WgW2.oZXukYWbXyeOr6uJv7Iu98gEiVk5wtnH4Qy', true, 'ar', NULL, '2026-06-13 07:01:58.513031+00', '2026-06-13 07:01:58.513031+00'),
	('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'inspector@tamayuz.sa', 'فيصل عمر', NULL, 'inspector', NULL, '$2a$06$dnk.MxuRUHObL3DwUkkaFu/2nr8GT8BuOc3k0lPY/.BGnx6jiGGJe', true, 'ar', NULL, '2026-06-13 07:01:58.513031+00', '2026-06-13 07:01:58.513031+00');


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: branches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."branches" ("id", "org_id", "name", "address", "city", "lat", "lng", "phone", "is_active", "created_at", "updated_at") VALUES
	('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'الفرع الرئيسي - الرياض', NULL, 'الرياض', NULL, NULL, NULL, true, '2026-06-13 07:01:58.513031+00', '2026-06-13 07:01:58.513031+00'),
	('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'فرع جدة', NULL, 'جدة', NULL, NULL, NULL, true, '2026-06-13 07:01:58.513031+00', '2026-06-13 07:01:58.513031+00'),
	('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'فرع الدمام', NULL, 'الدمام', NULL, NULL, NULL, true, '2026-06-13 07:01:58.513031+00', '2026-06-13 07:01:58.513031+00');


--
-- Data for Name: templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."templates" ("id", "org_id", "created_by", "title", "description", "industry", "category", "is_public", "sections", "is_active", "version", "created_at", "updated_at") VALUES
	('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'نموذج فحص المطاعم', 'نموذج شامل لفحص جودة المطاعم', 'restaurant', 'جودة', true, '[{"id": "sec1", "title": "النظافة العامة", "questions": [{"id": "q1", "type": "yes_no", "title": "هل أرضيات المطبخ نظيفة؟", "required": true}, {"id": "q2", "type": "yes_no", "title": "هل أسطح العمل معقمة؟", "required": true}, {"id": "q3", "max": 5, "type": "rating", "title": "تقييم النظافة العامة", "required": true}]}, {"id": "sec2", "title": "المواد الغذائية", "questions": [{"id": "q4", "type": "yes_no", "title": "هل تواريخ الصلاحية سليمة؟", "required": true}, {"id": "q5", "type": "yes_no", "title": "هل التخزين في درجة حرارة مناسبة؟", "required": true}]}, {"id": "sec3", "title": "خدمة العملاء", "questions": [{"id": "q6", "max": 5, "type": "rating", "title": "سرعة الخدمة", "required": true}, {"id": "q7", "type": "text", "title": "ملاحظات إضافية", "required": false}]}]', true, 1, '2026-06-13 07:01:58.513031+00', '2026-06-13 07:01:58.513031+00'),
	('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'نموذج فحص المخازن', 'فحص جودة المخازن والتخزين', 'warehouse', 'لوجستيات', true, '[{"id": "sec1", "title": "التخزين", "questions": [{"id": "q1", "type": "yes_no", "title": "هل التخزين منظم؟", "required": true}, {"id": "q2", "type": "yes_no", "title": "هل هناك مواد تالفة؟", "required": true}]}]', true, 1, '2026-06-13 07:01:58.513031+00', '2026-06-13 07:01:58.513031+00');


--
-- Data for Name: inspections; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: inspection_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: inspection_media; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: issues; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: qr_codes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: task_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_branches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_branches" ("user_id", "branch_id", "role_in_branch", "assigned_at") VALUES
	('b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'manager', '2026-06-13 07:01:58.513031+00'),
	('b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'manager', '2026-06-13 07:01:58.513031+00'),
	('b0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'inspector', '2026-06-13 07:01:58.513031+00'),
	('b0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000002', 'inspector', '2026-06-13 07:01:58.513031+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
	('inspection-media', 'inspection-media', NULL, '2026-06-13 07:03:09.188539+00', '2026-06-13 07:03:09.188539+00', true, false, 10485760, '{image/*,video/*,application/pdf}', NULL, 'STANDARD'),
	('avatars', 'avatars', NULL, '2026-06-13 07:03:14.913081+00', '2026-06-13 07:03:14.913081+00', true, false, 2097152, '{image/*}', NULL, 'STANDARD');


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict BFFS9a2QdDZcoi5RxWVKixntRT5DVL8eRnm7xhHM4AgOCgL6yobBV4MAgWhmnqp

RESET ALL;
