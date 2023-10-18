# Changelog

All notable changes to this project will be documented in this file.

## [v.2.3]

## Changed
- `z-index` of the Modals

## [v.2.2]

## Added
- Tests for editor

## Fixed
- Tooltip of the table was invisible because the menu was overlapping it.
- Tooltip of the Table wasn't displayed, when we clicked on button that opens it.
- Tooltip of the Link wasn't displayed, when we clicked on button that opens it.

## [v0.2.1]

### Fixed
- Emoji doesn't appear in line

## [v0.2.0]

### Added
- Possibility to change `mode` dynamically.

## [v0.1.8]

### Fixed
- Fixed problem, when some actions didn't work, because editor was still in loading state

## [v0.1.7]

### Fixed
- Context `schema` not found - while using multiple editors.

## [v0.1.6]

### Fixed
- Couldn't access text editor's ref

## [v0.1.5]

### Fixed
- Retrieving actual value of the text editor.

## [v0.1.4]

### Added
- Open the image when you click on it full screen. Lightbox-like behavior.

## [v0.1.3]

### Fixed
- When `onDataChange` was not provided, the editor keeps re-rendering

## [v0.1.2]

### Added

- Removed file validation and move entire logic to `onFileValidation` prop.
- Added `inputAcceptedFormats`, which is used for input that browsing files on users machine.
- Added `getValue` function to the `EditorRef` ref.

## [v0.1.1]

### Fixed
- Issue, when `getNodesByMark` returns links, that does not have `href` attribute

## [v0.1.0]

### Added
- New props - `onFileUpload` and `showMenu`.
- Added `placeholderPlugin` along with `placeholder` prop

## Changed
- Updated `@milkdown/**` libraries.

### Fixed
- Fixed bug, when drag and drop always returns error with wrong document extension.

## [v0.0.26]

### Added

- `acceptedFormats` prop.
- Possibility to add any kind of documents.
- New component - `FileNode` which displays documents that are not images.
