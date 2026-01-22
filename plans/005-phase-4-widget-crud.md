# Plan: Widget CRUD (Add & Edit)

## Context
We have a working dashboard where users can list, delete, and reorder widgets. The next step is to allow users to **Add** new widgets and **Edit** existing ones. This requires creating forms for each widget type (`Link`, `Menu`, `Gallery`, `Heading`, `Map`) and managing the dialog state.

## Goals
1.  **Add Widget Dialog:** A modal to select the widget type and fill in initial data.
2.  **Edit Widget Dialog:** A modal pre-filled with existing data to update a specific widget.
3.  **Form Components:** Reusable or specific forms for each widget type.

## Step-by-Step Implementation

### 1. Reusable Components
- [ ] **`WidgetEditorDialog` Component:** A container dialog that handles open/close state and title.
- [ ] **`WidgetTypeSelector`:** A step (for "Add" flow) to let the user choose which widget to create.

### 2. Widget Forms
Create a form component for each widget type. Each form should accept `initialData` (optional) and an `onSubmit` handler.
- [ ] `LinkWidgetForm`: Title, URL, Icon (select), Description.
- [ ] `MenuWidgetForm`: Name, Price, Description, Image URL.
- [ ] `HeadingWidgetForm`: Title, Subtitle.
- [ ] `GalleryWidgetForm`: List of Image URLs (add/remove inputs).
- [ ] `MapWidgetForm`: Location string.

### 3. Integration in `WidgetsPage`
- [ ] **Add Flow:**
    - Add "Add Widget" button -> Opens Dialog.
    - Step 1: Select Type.
    - Step 2: Show corresponding Form.
    - Submit -> Create new widget -> Save to storage -> Close Dialog.
- [ ] **Edit Flow:**
    - Click "Edit" (Pencil) icon on a widget -> Opens Dialog with that widget's type and data.
    - Submit -> Update widget in storage -> Close Dialog.

### 4. Refinement
- [ ] Ensure validation (e.g., required fields).
- [ ] smooth transitions between steps.
