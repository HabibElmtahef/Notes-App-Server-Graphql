-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `note_ibfk_1`;

-- AlterTable
ALTER TABLE `user` MODIFY `avatar` VARCHAR(191) NOT NULL DEFAULT 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png';

-- AddForeignKey
ALTER TABLE `Note` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
