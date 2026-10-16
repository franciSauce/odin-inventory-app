import { $, setupFilterDropdown } from './utils/index.js'

const startDateInput = $('#startdate');
const endDateInput = $('#enddate');
const statusSelect = $('#status');

statusSelect.addEventListener('change', () => {
  if (statusSelect.value === 'Releasing' || statusSelect.value === 'Hiatus') {
    endDateInput.disabled = true;
    endDateInput.value = '';
  } else {
    endDateInput.disabled = false;
  }
});

startDateInput.addEventListener('change', () => {
  endDateInput.min = startDateInput.value;
});

endDateInput.addEventListener('change', () => {
  startDateInput.max = endDateInput.value;
});

const staffInput = $('#staff');
const addStaffDialog = $('#add-staff-dialog');
setupFilterDropdown(staffInput, addStaffDialog, 'staff-buttons', 'memberid');

const rolesInput = $('#roles');
const addRolesDialog = $('#add-roles-dialog');
setupFilterDropdown(rolesInput, addRolesDialog, 'roles-buttons', 'roleid');

const addStaffRole = $('.add-staff-role');
const assignedStaffRolesContainer = $('ul.assigned-staff-roles');
const staffHiddenInput = $('input[name="staff"]');

