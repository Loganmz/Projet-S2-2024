/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Relaxation = "Relaxation",
	SouvenirsPhoto = "Souvenirs_photo",
	Activite = "activite",
	Citation = "citation",
	SuivisHumeur = "suivis_humeur",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type RelaxationRecord = {
	numero_de_la_seance_de_relaxation?: number
	numero_de_la_seance_de_respiration?: number
	participe_a?: RecordIdString
}

export type SouvenirsPhotoRecord = {
	date_de_la_photo?: IsoDateString
	lieu?: string
	photo?: string
	possede?: RecordIdString
}

export type ActiviteRecord = {
	image_activite?: string
	image_session?: string
	nom_activite?: string
	recommandation?: boolean
}

export type CitationRecord = {
	author?: string
	date?: IsoDateString
	lit?: RecordIdString
	quote?: string
}

export enum SuivisHumeurHumeurOptions {
	"super bien" = "super bien",
	"bien" = "bien",
	"cela pourrait être mieux" = "cela pourrait être mieux",
	"pas bien" = "pas bien",
}
export type SuivisHumeurRecord = {
	humeur?: SuivisHumeurHumeurOptions
	suit?: RecordIdString
}

export type UsersRecord = {
	nom?: string
	photo_de_profil?: string
	prenom?: string
}

// Response types include system fields and match responses from the PocketBase API
export type RelaxationResponse<Texpand = unknown> = Required<RelaxationRecord> & BaseSystemFields<Texpand>
export type SouvenirsPhotoResponse<Texpand = unknown> = Required<SouvenirsPhotoRecord> & BaseSystemFields<Texpand>
export type ActiviteResponse<Texpand = unknown> = Required<ActiviteRecord> & BaseSystemFields<Texpand>
export type CitationResponse<Texpand = unknown> = Required<CitationRecord> & BaseSystemFields<Texpand>
export type SuivisHumeurResponse<Texpand = unknown> = Required<SuivisHumeurRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	Relaxation: RelaxationRecord
	Souvenirs_photo: SouvenirsPhotoRecord
	activite: ActiviteRecord
	citation: CitationRecord
	suivis_humeur: SuivisHumeurRecord
	users: UsersRecord
}

export type CollectionResponses = {
	Relaxation: RelaxationResponse
	Souvenirs_photo: SouvenirsPhotoResponse
	activite: ActiviteResponse
	citation: CitationResponse
	suivis_humeur: SuivisHumeurResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'Relaxation'): RecordService<RelaxationResponse>
	collection(idOrName: 'Souvenirs_photo'): RecordService<SouvenirsPhotoResponse>
	collection(idOrName: 'activite'): RecordService<ActiviteResponse>
	collection(idOrName: 'citation'): RecordService<CitationResponse>
	collection(idOrName: 'suivis_humeur'): RecordService<SuivisHumeurResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
