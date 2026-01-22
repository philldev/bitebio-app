# Plan: Widget Manager Refactor (Grid & Drag-and-Drop)

## Context
The current Widget Manager uses a simple vertical list. We want to transform it into a responsive grid that mirrors the public profile, enabling users to reorder widgets via drag-and-drop and adjust widget sizes directly.

## Goals
1.  **Grid Layout:** Use a Bento-style grid for the dashboard management view.
2.  **Drag and Drop:** Implement reordering using `@dnd-kit`.
3.  **Size Editing:** Add controls to each widget card to quickly toggle between valid sizes (1x1, 2x1, 2x2, full, etc.).

## Step-by-Step Implementation

### 1. Dependencies
- [ ] Install `@dnd-kit/core`, `@dnd-kit/sortable`, and `@dnd-kit/utilities` using `bun`.

### 2. UI Refactor: `WidgetsPage`
- [ ] Replace the current list rendering with a sortable grid container.
- [ ] Create a `SortableWidgetCard` component.
    - This will be a wrapper around the widget preview that handles drag listeners.
    - It should display:
        - A "Drag handle" icon.
        - The widget type/name.
        - **Size Selector:** A dropdown or button group to change the widget's `size`.
        - **Action Buttons:** Edit (open dialog) and Delete.

### 3. Drag and Drop Logic
- [ ] Wrap the grid in `DndContext`.
- [ ] Use `SortableContext` with the `rectSortingStrategy` (suitable for grids).
- [ ] Implement `handleDragEnd` to update the widget order in `localStorage`.

### 4. Size Editing Logic
- [ ] Add a `handleSizeChange(id, newSize)` function to the `WidgetsPage`.
- [ ] Update the `Widget` object in the profile state and persist to storage.
- [ ] Ensure the grid layout updates immediately when a size is changed.

### 5. Polish
- [ ] Add "Drag Overlay" for a smoother visual experience during movement.
- [ ] Ensure the "Add Widget" dialog still works correctly within the new layout.
- [ ] Match the dashboard's "Maia" theme (Orange/Maia).

## Verification
- [ ] Drag a widget to a new position -> Order persists on refresh.
- [ ] Change a widget size (e.g., 1x1 to 2x2) -> Grid adjusts visually.
- [ ] Check public profile -> Order and sizes match the dashboard changes.
